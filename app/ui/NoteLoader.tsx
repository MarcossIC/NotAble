export default function NoteLoader() {
	return (
		<svg
			role='img'
			width='390'
			height='160'
			aria-labelledby='loading-aria'
			viewBox='0 0 390 160'
			preserveAspectRatio='none'>
			<title id='loading-aria'>Loading...</title>
			<rect
				x='0'
				y='0'
				width='100%'
				height='100%'
				clip-path='url(#clip-path)'
				style={'fill: url("#fill");' as any}></rect>
			<defs>
				<clipPath id='clip-path'>
					<rect
						x='40'
						y='45'
						rx='3'
						ry='3'
						width='178'
						height='10'
					/>
					<circle
						cx='20'
						cy='17'
						r='15'
					/>
					<rect
						x='40'
						y='25'
						rx='0'
						ry='0'
						width='300'
						height='10'
					/>
					<rect
						x='40'
						y='5'
						rx='3'
						ry='3'
						width='300'
						height='10'
					/>
				</clipPath>
				<linearGradient id='fill'>
					<stop
						offset='0.599964'
						stop-color='#f3f3f3'
						stop-opacity='1'>
						<animate
							attributeName='offset'
							values='-2; -2; 1'
							keyTimes='0; 0.25; 1'
							dur='2s'
							repeatCount='indefinite'></animate>
					</stop>
					<stop
						offset='1.59996'
						stop-color='#ecebeb'
						stop-opacity='1'>
						<animate
							attributeName='offset'
							values='-1; -1; 2'
							keyTimes='0; 0.25; 1'
							dur='2s'
							repeatCount='indefinite'></animate>
					</stop>
					<stop
						offset='2.59996'
						stop-color='#f3f3f3'
						stop-opacity='1'>
						<animate
							attributeName='offset'
							values='0; 0; 3'
							keyTimes='0; 0.25; 1'
							dur='2s'
							repeatCount='indefinite'></animate>
					</stop>
				</linearGradient>
			</defs>
		</svg>
	);
}
