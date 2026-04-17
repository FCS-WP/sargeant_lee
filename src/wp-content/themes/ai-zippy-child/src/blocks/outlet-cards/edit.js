import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PanelBody, TextControl, TextareaControl, Button } from "@wordpress/components";

const DEFAULT_CARD = {
	imageUrl: "",
	imageId: 0,
	logoUrl: "",
	logoId: 0,
	heading: "Outlet Name",
	linkUrl: "#",
	linkLabel: "See More",
};

export default function Edit({ attributes, setAttributes }) {
	const { cards, bgUrl, bgId, paddingTop, paddingBottom } = attributes;
	const blockProps = useBlockProps();

	const updateCard = (index, fields) => {
		const updated = cards.map((card, i) =>
			i === index ? { ...card, ...fields } : card
		);
		setAttributes({ cards: updated });
	};

	const addCard = () => {
		setAttributes({ cards: [...cards, { ...DEFAULT_CARD }] });
	};

	const removeCard = (index) => {
		setAttributes({ cards: cards.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Block Background", "ai-zippy-child")} initialOpen={true}>
					<p style={{ marginBottom: "4px", fontWeight: 600 }}>
						{__("Background Image", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ bgUrl: media.url, bgId: media.id })}
							allowedTypes={["image"]}
							value={bgId}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ marginBottom: "8px" }}>
									{bgUrl
										? __("Replace background", "ai-zippy-child")
										: __("Upload background", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{bgUrl && (
						<Button
							variant="link"
							isDestructive
							onClick={() => setAttributes({ bgUrl: "", bgId: 0 })}
							style={{ display: "block", marginBottom: "12px" }}
						>
							{__("Remove background", "ai-zippy-child")}
						</Button>
					)}
					<TextControl
						label={__("Padding top", "ai-zippy-child")}
						value={paddingTop}
						onChange={(value) => setAttributes({ paddingTop: value })}
						help={__("CSS value e.g. 60px, 4rem", "ai-zippy-child")}
					/>
					<TextControl
						label={__("Padding bottom", "ai-zippy-child")}
						value={paddingBottom}
						onChange={(value) => setAttributes({ paddingBottom: value })}
						help={__("CSS value e.g. 60px, 4rem", "ai-zippy-child")}
					/>
				</PanelBody>

				{cards.map((card, index) => (
					<PanelBody
						key={index}
						title={`${__("Card", "ai-zippy-child")} ${index + 1}: ${card.heading || __("(untitled)", "ai-zippy-child")}`}
						initialOpen={index === 0}
					>
						{/* Background image */}
						<p style={{ marginBottom: "4px", fontWeight: 600 }}>
							{__("Background Image", "ai-zippy-child")}
						</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									updateCard(index, { imageUrl: media.url, imageId: media.id });
								}}
								allowedTypes={["image"]}
								value={card.imageId}
								render={({ open }) => (
									<Button variant="secondary" onClick={open} style={{ marginBottom: "8px" }}>
										{card.imageUrl
											? __("Replace background", "ai-zippy-child")
											: __("Upload background", "ai-zippy-child")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{card.imageUrl && (
							<Button
								variant="link"
								isDestructive
								onClick={() => updateCard(index, { imageUrl: "", imageId: 0 })}
								style={{ display: "block", marginBottom: "12px" }}
							>
								{__("Remove background", "ai-zippy-child")}
							</Button>
						)}

						{/* Logo image */}
						<p style={{ marginBottom: "4px", fontWeight: 600 }}>
							{__("Logo", "ai-zippy-child")}
						</p>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(media) => {
									updateCard(index, { logoUrl: media.url, logoId: media.id });
								}}
								allowedTypes={["image"]}
								value={card.logoId}
								render={({ open }) => (
									<Button variant="secondary" onClick={open} style={{ marginBottom: "8px" }}>
										{card.logoUrl
											? __("Replace logo", "ai-zippy-child")
											: __("Upload logo", "ai-zippy-child")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
						{card.logoUrl && (
							<Button
								variant="link"
								isDestructive
								onClick={() => updateCard(index, { logoUrl: "", logoId: 0 })}
								style={{ display: "block", marginBottom: "12px" }}
							>
								{__("Remove logo", "ai-zippy-child")}
							</Button>
						)}

						<TextareaControl
							label={__("Heading", "ai-zippy-child")}
							help={__("Use Enter for line breaks.", "ai-zippy-child")}
							value={card.heading}
							onChange={(value) => updateCard(index, { heading: value })}
							rows={3}
						/>
						<TextControl
							label={__("Button label", "ai-zippy-child")}
							value={card.linkLabel}
							onChange={(value) => updateCard(index, { linkLabel: value })}
						/>
						<TextControl
							label={__("Button URL", "ai-zippy-child")}
							value={card.linkUrl}
							onChange={(value) => updateCard(index, { linkUrl: value })}
						/>

						{cards.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={() => removeCard(index)}
							>
								{__("Remove this card", "ai-zippy-child")}
							</Button>
						)}
					</PanelBody>
				))}

				<div style={{ padding: "16px" }}>
					<Button variant="primary" onClick={addCard}>
						{__("+ Add card", "ai-zippy-child")}
					</Button>
				</div>
			</InspectorControls>

			{/* Editor preview */}
			<div {...blockProps} style={{
				...(bgUrl ? { "--oc-bg": `url('${bgUrl}')` } : {}),
				"--oc-pt": paddingTop,
				"--oc-pb": paddingBottom,
			}}>
				<div className="oc__section-bg" aria-hidden="true" />
				<div className="oc__grid">
					{cards.map((card, index) => (
						<div
							key={index}
							className="oc__card"
						>
							{card.imageUrl && (
								<img
									className="oc__bg"
									src={card.imageUrl}
									alt=""
									aria-hidden="true"
								/>
							)}
							<div className="oc__overlay" />
							<div className="oc__body">
								{card.logoUrl
									? <div className="oc__logo-wrap"><img src={card.logoUrl} alt="" className="oc__logo" /></div>
									: <div className="oc__logo-placeholder" />
								}
								<h2 className="oc__heading" dangerouslySetInnerHTML={{ __html: card.heading.replace(/\n/g, "<br>") }} />
								<span className="oc__btn">{card.linkLabel}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
