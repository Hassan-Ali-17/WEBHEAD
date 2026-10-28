import Image from 'next/image';
import React from 'react';
import DraggableWindow from '../../utils/DraggableWindow/DraggableWindow';
import ProjectsExplorer from '../FileExplorer/ProjectsExplorer';

export default function ProjectsWindow() {
	return (
		<DraggableWindow
			windowName="projects"
			topTitle="File Explorer — Featured Projects (C:\Dev\FeaturedProjects)"
			topIcon={
				<Image
					src="/icons/folder/folder.png"
					width={18}
					height={18}
					alt="Projects"
				/>
			}
		>
			<ProjectsExplorer />
		</DraggableWindow>
	);
}
