import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		eyebrow,
		heading,
		content,
		logoUrl,
		logoId,
		image1Url,
		image1Id,
		image2Url,
		image2Id,
		layout,
		showBorder,
		paddingTop,
		paddingBottom,
		btnLabel,
		btnUrl,
	} = attributes;

	const blockProps = useBlockProps({
		className: `of of--${layout}${showBorder ? " of--border" : ""}`,
	});

	const wrapperStyle = {
		"--of-pt": paddingTop,
		"--of-pb": paddingBottom,
	};

	// Images column
	const imagesCol = (
		<div className="of__images">
			<div className="of__img-primary">
				{image1Url
					? <img src={image1Url} alt="" className="of__img" />
					: <div className="of__img-placeholder">{__("Image 1 (primary)", "ai-zippy-child")}</div>
				}
			</div>
			<div className="of__img-secondary">
				{image2Url
					? <img src={image2Url} alt="" className="of__img" />
					: <div className="of__img-placeholder">{__("Image 2 (secondary)", "ai-zippy-child")}</div>
				}
			</div>
		</div>
	);

	// Text column
	const textCol = (
		<div className="of__content">
			{logoUrl && (
				<div className="of__logo">
					<img src={logoUrl} alt="" className="of__logo-img" />
				</div>
			)}
			{eyebrow && (
				<div className="of__eyebrow">
					<span className="of__eyebrow-line" aria-hidden="true" />
					<span className="of__eyebrow-text">{eyebrow}</span>
				</div>
			)}
			{heading && <h2 className="of__heading">{heading}</h2>}
			{content && (
				<div className="of__body">
					{content.split(/\n\n+/).map((para, i) => (
						<p key={i}>{para}</p>
					))}
				</div>
			)}
			{btnLabel && (
				<div className="of__btn-wrap">
					<a className="of__btn" href={btnUrl || "#"}>{btnLabel}</a>
				</div>
			)}
		</div>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Layout", "ai-zippy-child")} initialOpen={true}>
					<SelectControl
						label={__("Column order", "ai-zippy-child")}
						value={layout}
						options={[
							{ label: __("Text left, Images right", "ai-zippy-child"), value: "text-left" },
							{ label: __("Images left, Text right", "ai-zippy-child"), value: "text-right" },
						]}
						onChange={(value) => setAttributes({ layout: value })}
					/>
					<ToggleControl
						label={__("Show orange bottom border", "ai-zippy-child")}
						checked={showBorder}
						onChange={(value) => setAttributes({ showBorder: value })}
					/>
					<TextControl
						label={__("Padding top", "ai-zippy-child")}
						value={paddingTop}
						onChange={(value) => setAttributes({ paddingTop: value })}
						help={__("CSS value e.g. 80px, 6rem", "ai-zippy-child")}
					/>
					<TextControl
						label={__("Padding bottom", "ai-zippy-child")}
						value={paddingBottom}
						onChange={(value) => setAttributes({ paddingBottom: value })}
						help={__("CSS value e.g. 80px, 6rem", "ai-zippy-child")}
					/>
				</PanelBody>

				<PanelBody title={__("Images", "ai-zippy-child")} initialOpen={true}>
					{/* Logo */}
					<p style={{ fontWeight: 600, marginBottom: "4px" }}>
						{__("Logo (optional)", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ logoUrl: media.url, logoId: media.id })}
							allowedTypes={["image"]}
							value={logoId}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "6px", display: "block" }}>
									{logoUrl ? __("Replace logo", "ai-zippy-child") : __("Upload logo", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{logoUrl && (
						<Button variant="link" isDestructive onClick={() => setAttributes({ logoUrl: "", logoId: 0 })} style={{ display: "block", marginBottom: "12px" }}>
							{__("Remove logo", "ai-zippy-child")}
						</Button>
					)}
				
					{/* Image 1 */}
					<p style={{ fontWeight: 600, marginBottom: "4px" }}>
						{__("Image 1 — primary (top-right)", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ image1Url: media.url, image1Id: media.id })}
							allowedTypes={["image"]}
							value={image1Id}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "6px", display: "block" }}>
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
					<p style={{ fontWeight: 600, marginBottom: "4px" }}>
						{__("Image 2 — secondary (bottom-left)", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ image2Url: media.url, image2Id: media.id })}
							allowedTypes={["image"]}
							value={image2Id}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "6px", display: "block" }}>
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
						help={__("Blank line = new paragraph.", "ai-zippy-child")}
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						rows={6}
					/>
					<TextControl
						label={__("Button label", "ai-zippy-child")}
						value={btnLabel}
						onChange={(value) => setAttributes({ btnLabel: value })}
						help={__("Leave blank to hide button.", "ai-zippy-child")}
					/>
					<TextControl
						label={__("Button URL", "ai-zippy-child")}
						value={btnUrl}
						onChange={(value) => setAttributes({ btnUrl: value })}
						type="url"
					/>
				</PanelBody>
			</InspectorControls>

			{/* Editor preview */}
			<div {...blockProps} style={wrapperStyle}>
				<div className="of__inner">
					{layout === "text-left" ? (
						<>{textCol}{imagesCol}</>
					) : (
						<>{imagesCol}{textCol}</>
					)}
				</div>
			</div>
		</>
	);
}
