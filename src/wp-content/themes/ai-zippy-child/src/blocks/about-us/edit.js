import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		eyebrow,
		heading,
		content,
		buttonLabel,
		buttonUrl,
		image1Url,
		image1Id,
		image2Url,
		image2Id,
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Images", "ai-zippy-child")} initialOpen={true}>
					{/* Image 1 */}
					<p style={{ marginBottom: "4px", fontWeight: 600 }}>
						{__("Image 1 (back)", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ image1Url: media.url, image1Id: media.id })}
							allowedTypes={["image"]}
							value={image1Id}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "8px" }}>
									{image1Url ? __("Replace image 1", "ai-zippy-child") : __("Upload image 1", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{image1Url && (
						<Button variant="link" isDestructive onClick={() => setAttributes({ image1Url: "", image1Id: 0 })} style={{ display: "block", marginBottom: "12px" }}>
							{__("Remove image 1", "ai-zippy-child")}
						</Button>
					)}

					{/* Image 2 */}
					<p style={{ marginBottom: "4px", fontWeight: 600 }}>
						{__("Image 2 (front)", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ image2Url: media.url, image2Id: media.id })}
							allowedTypes={["image"]}
							value={image2Id}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "8px" }}>
									{image2Url ? __("Replace image 2", "ai-zippy-child") : __("Upload image 2", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{image2Url && (
						<Button variant="link" isDestructive onClick={() => setAttributes({ image2Url: "", image2Id: 0 })} style={{ display: "block", marginBottom: "12px" }}>
							{__("Remove image 2", "ai-zippy-child")}
						</Button>
					)}
				</PanelBody>

				<PanelBody title={__("Text Content", "ai-zippy-child")} initialOpen={true}>
					<TextControl
						label={__("Eyebrow label", "ai-zippy-child")}
						value={eyebrow}
						onChange={(value) => setAttributes({ eyebrow: value })}
					/>
					<TextControl
						label={__("Heading", "ai-zippy-child")}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
					<TextareaControl
						label={__("Content", "ai-zippy-child")}
						help={__("Use a blank line to separate paragraphs.", "ai-zippy-child")}
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						rows={8}
					/>
					<TextControl
						label={__("Button label", "ai-zippy-child")}
						value={buttonLabel}
						onChange={(value) => setAttributes({ buttonLabel: value })}
					/>
					<TextControl
						label={__("Button URL", "ai-zippy-child")}
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Editor preview */}
			<div {...blockProps}>
				<div className="au__inner">
					{/* Left: stacked images */}
					<div className="au__images">
						<div className="au__img-back">
							{image1Url
								? <img src={image1Url} alt="" className="au__img" />
								: <div className="au__img-placeholder">Image 1</div>
							}
						</div>
						<div className="au__img-front">
							{image2Url
								? <img src={image2Url} alt="" className="au__img" />
								: <div className="au__img-placeholder">Image 2</div>
							}
						</div>
					</div>

					{/* Right: text content */}
					<div className="au__content">
						{(eyebrow || heading) && (
							<div className="au__header">
								{eyebrow && (
									<div className="au__eyebrow">
										<span className="au__eyebrow-line" aria-hidden="true" />
										<span className="au__eyebrow-text">{eyebrow}</span>
									</div>
								)}
								{heading && <h2 className="au__heading">{heading}</h2>}
							</div>
						)}
						{content && (
							<div className="au__body">
								{content.split(/\n\n+/).map((para, i) => (
									<p key={i}>{para}</p>
								))}
							</div>
						)}
						{buttonLabel && (
							<a className="au__btn" href={buttonUrl}>{buttonLabel}</a>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
