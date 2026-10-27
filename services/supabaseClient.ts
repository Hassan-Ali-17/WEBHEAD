import { createClient, RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export interface ChatMessage {
	id: string;
	created_at: string;
	display_name: string;
	avatar: string;
	content: string;
	is_reported?: boolean;
}

let supabaseInstance: SupabaseClient | null = null;

export const isSupabaseConfigured = (): boolean => {
	const url = PORTFOLIO_CONFIG.supabase.url;
	const key = PORTFOLIO_CONFIG.supabase.anonKey;
	return Boolean(url && key && url.startsWith('http') && key.length > 10);
};

export const getSupabase = (): SupabaseClient | null => {
	if (!isSupabaseConfigured()) {
		return null;
	}
	if (!supabaseInstance) {
		supabaseInstance = createClient(
			PORTFOLIO_CONFIG.supabase.url,
			PORTFOLIO_CONFIG.supabase.anonKey,
			{
				realtime: {
					params: {
						eventsPerSecond: 10,
					},
				},
			},
		);
	}
	return supabaseInstance;
};

// Fetch initial messages with pagination/limit
export const fetchRecentMessages = async (limit = 50): Promise<{ data: ChatMessage[]; error: string | null }> => {
	const client = getSupabase();
	if (!client) {
		return { data: [], error: 'Supabase credentials are not configured.' };
	}

	try {
		const { data, error } = await client
			.from('messages')
			.select('*')
			.order('created_at', { ascending: true })
			.limit(limit);

		if (error) {
			return { data: [], error: error.message };
		}
		return { data: (data as ChatMessage[]) || [], error: null };
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : 'Failed to connect to messages database';
		return { data: [], error: msg };
	}
};

// Post a new message
export const sendChatMessage = async (
	message: Omit<ChatMessage, 'id' | 'created_at'>,
): Promise<{ success: boolean; error: string | null; data?: ChatMessage }> => {
	const client = getSupabase();
	if (!client) {
		return { success: false, error: 'Supabase credentials are not configured.' };
	}

	try {
		const { data, error } = await client
			.from('messages')
			.insert([
				{
					display_name: message.display_name.trim().slice(0, 50),
					avatar: message.avatar || 'miles',
					content: message.content.trim().slice(0, 500),
				},
			])
			.select()
			.single();

		if (error) {
			return { success: false, error: error.message };
		}
		return { success: true, error: null, data: data as ChatMessage };
	} catch (err: unknown) {
		const msg = err instanceof Error ? err.message : 'Network failure sending message';
		return { success: false, error: msg };
	}
};

// Realtime subscription handler
export const subscribeToNewMessages = (
	onMessage: (msg: ChatMessage) => void,
): RealtimeChannel | null => {
	const client = getSupabase();
	if (!client) return null;

	const channel = client
		.channel('public:messages')
		.on(
			'postgres_changes',
			{ event: 'INSERT', schema: 'public', table: 'messages' },
			(payload) => {
				if (payload.new) {
					onMessage(payload.new as ChatMessage);
				}
			},
		)
		.subscribe();

	return channel;
};

// Heart / Like counter RPC or query
export const fetchLikesCount = async (): Promise<{ count: number; error: string | null }> => {
	const client = getSupabase();
	if (!client) {
		return { count: 0, error: 'Supabase not configured' };
	}

	try {
		const { data, error } = await client
			.from('site_stats')
			.select('count')
			.eq('id', 'heart_likes')
			.single();

		if (error) return { count: 0, error: error.message };
		return { count: data?.count ? Number(data.count) : 0, error: null };
	} catch {
		return { count: 0, error: 'Failed to fetch likes' };
	}
};

export const incrementLikeCount = async (): Promise<{ count: number; error: string | null }> => {
	const client = getSupabase();
	if (!client) {
		return { count: 0, error: 'Supabase not configured' };
	}

	try {
		const { data, error } = await client.rpc('increment_like');
		if (error) return { count: 0, error: error.message };
		return { count: Number(data), error: null };
	} catch {
		return { count: 0, error: 'Failed to increment like' };
	}
};
