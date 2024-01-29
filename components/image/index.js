import { MediaPlaceholder } from '@wordpress/block-editor';
import { useMemo, Children } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal Dependencies
 */
import { Media, ImageContext, Figure, InlineControls } from './child-components';
import { useMedia } from '../../hooks/use-media';

const ImageWrapper = (props) => {
	const {
		id,
		size = 'full',
		onSelect,
		focalPoint = { x: 0.5, y: 0.5 },
		onChangeFocalPoint,
		labels = {},
		canEditImage = true,
		children,
		hasInlineControls = false,
		isOptional = true,
		onRemove,
		style,
		...rest
	} = props;
	const hasImage = !!id;
	const { media, isResolvingMedia } = useMedia(id);

	const hasRenderCallback = typeof children === 'function';
	const hasChildComponents = !hasRenderCallback && Children.count(children);

	const shouldDisplayFocalPointPicker = typeof onChangeFocalPoint === 'function';

	const imageUrl = media?.media_details?.sizes[size]?.source_url ?? media?.source_url;
	const altText = media?.alt_text;

	const imageContext = useMemo(() => {
		return {
			id,
			size,
			focalPoint,
			onChangeFocalPoint,
			imageUrl,
			altText,
			labels,
			canEditImage,
			onSelect,
			isResolvingMedia,
			shouldDisplayFocalPointPicker,
			hasImage,
			hasInlineControls,
			isOptional,
			onRemove,
		};
	}, [
		id,
		size,
		focalPoint,
		onChangeFocalPoint,
		imageUrl,
		altText,
		labels,
		canEditImage,
		onSelect,
		isResolvingMedia,
		shouldDisplayFocalPointPicker,
		hasImage,
		hasInlineControls,
		isOptional,
		onRemove,
	]);

	if (hasRenderCallback) {
		return children({
			hasImage,
			imageUrl,
			altText,
			focalPoint,
			labels,
			canEditImage,
			onSelect,
			hasInlineControls,
			isOptional,
			onRemove,
		});
	}

	if (hasChildComponents) {
		return <ImageContext.Provider value={imageContext}>{children}</ImageContext.Provider>;
	}

	if (!hasImage && canEditImage) {
		return (
			<MediaPlaceholder
				labels={labels}
				onSelect={onSelect}
				accept="image"
				multiple={false}
				disableMediaButtons={imageUrl}
			/>
		);
	}

	return (
		<ImageContext.Provider value={imageContext}>
			{hasImage && !!hasInlineControls ? (
				<Figure style={{ ...style }} {...rest}>
					<Media />
					<InlineControls
						imageUrl={imageUrl}
						onSelect={onSelect}
						isOptional={isOptional}
						onRemove={onRemove}
					/>
				</Figure>
			) : (
				<Media style={{ display: 'block', ...style }} {...rest} />
			)}
		</ImageContext.Provider>
	);
};

ImageWrapper.Figure = Figure;

export { ImageWrapper as Image };

ImageWrapper.defaultProps = {
	size: 'large',
	focalPoint: { x: 0.5, y: 0.5 },
	onChangeFocalPoint: undefined,
	labels: {},
	canEditImage: true,
	hasInlineControls: false,
	isOptional: true,
	onRemove: undefined,
	children: undefined,
	style: {},
};

ImageWrapper.propTypes = {
	id: PropTypes.number.isRequired,
	size: PropTypes.string,
	onSelect: PropTypes.func.isRequired,
	onChangeFocalPoint: PropTypes.func,
	focalPoint: PropTypes.shape({
		x: PropTypes.string,
		y: PropTypes.string,
	}),
	labels: PropTypes.shape({
		title: PropTypes.string,
		instructions: PropTypes.string,
	}),
	canEditImage: PropTypes.bool,
	hasInlineControls: PropTypes.bool,
	isOptional: PropTypes.bool,
	onRemove: PropTypes.func,
	children: PropTypes.node,
	style: PropTypes.object,
};
