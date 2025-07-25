import React, { ComponentProps } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BoxIcon } from './box-icon';
import { type LucideIcon } from 'lucide-react';

interface FooterLinkItem {
	id: number;
	name: string;
	icon?: LucideIcon;
	box?: string;
	link: string;
}

interface FooterLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
	item: FooterLinkItem;
}

export function FooterLink({ item, ...props }: FooterLinkProps) {
	return (
		<Link href={item.link} {...props}>
			<Button variant="ghost" className="flex items-center justify-start text-start w-full h-auto p-2 cursor-pointer transition-colors">
				{item.box && !item.icon && (
					<BoxIcon 
						className="me-2 text-foreground"
						name={item.box}
						size='24'
						type={"logo"}
					/>
				)}
				{/** className="me-2 h-4 w-4 text-gray-600"  */}
				{item.icon && !item.box && (
					<item.icon size={20} className="h-5 w-5" />
				)}
				<span className="text-foreground">{item.name}</span>
			</Button>
		</Link>
	);
}