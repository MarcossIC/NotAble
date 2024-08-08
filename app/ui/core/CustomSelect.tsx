'use client';

import useClickOutside from '@/lib/useClickOutside';
import { useState, useRef, type FC } from 'react';
import Show from './Show';
import type { SelectOption } from '@/app/models/SelectOption';

interface CustomSelectProps {
	id: string;
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	dropDownClassName?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({ id, dropDownClassName, options, value, onChange }) => {
	const [open, setOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	useClickOutside(selectRef, () => setOpen(false));

	const handleSelect = (option: SelectOption) => {
		onChange(option.content as string);
		setOpen(false);
	};
	return (
		<div
			ref={selectRef}
			className='inputWrapper'>
			<input
				id={id}
				name={id}
				type='text'
				value={value}
				placeholder=''
				className='w-full select-none cursor-pointer'
				readOnly={true}
				onClick={() => setOpen(!open)}
			/>
			<div
				className={`absolute left-0 bg-notable-primary-50 w-full group rounded-lg z-20 transition-all duration-200 ${dropDownClassName} ${
					open ? 'h-auto top-[110%] opacity-100' : 'h-0 top-[80%] opacity-0'
				} `}>
				<Show when={open}>
					<div className='w-auto h-auto'>
						{options.map((option) => (
							<div
								key={option.id}
								className='p-2 select-none cursor-pointer first:rounded-t-lg last:rounded-b-lg hover:bg-notable-primary-100'
								onClick={() => handleSelect(option)}>
								{option.content}
							</div>
						))}
					</div>
				</Show>
			</div>
		</div>
	);
};

export default CustomSelect;
