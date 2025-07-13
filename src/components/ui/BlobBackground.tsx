export const BlobBackground = () => {
	return (
		<svg
			role="img"
			aria-label="Decorative background with animated gradient circles"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid slice"
			className="absolute inset-0"
		>
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#4F46E5" />
					<stop offset="100%" stopColor="#EC4899" />
				</linearGradient>
				<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="5" result="coloredBlur" />
					<feMerge>
						<feMergeNode in="coloredBlur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>
			<circle
				cx="20"
				cy="20"
				r="15"
				fill="url(#grad1)"
				filter="url(#glow)"
				className="animate-blob-1"
			/>
			<circle
				cx="80"
				cy="50"
				r="20"
				fill="url(#grad1)"
				filter="url(#glow)"
				className="animate-blob-2"
			/>
			<circle
				cx="40"
				cy="80"
				r="10"
				fill="url(#grad1)"
				filter="url(#glow)"
				className="animate-blob-3"
			/>
		</svg>
	);
};
