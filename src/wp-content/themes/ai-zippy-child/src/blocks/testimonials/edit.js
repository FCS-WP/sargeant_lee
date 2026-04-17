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
	RangeControl,
	SelectControl,
} from "@wordpress/components";

// Star rating preview component
function StarRating({ rating }) {
	return (
		<div className="tm__stars" aria-label={`${rating} out of 5 stars`}>
			{[1, 2, 3, 4, 5].map((i) => (
				<span key={i} className={i <= rating ? "tm__star tm__star--on" : "tm__star"}>
					★
				</span>
			))}
		</div>
	);
}

export default function Edit({ attributes, setAttributes }) {
	const { mode, shortcode, heading, bgUrl, bgId, items, paddingTop, paddingBottom } = attributes;

	const blockProps = useBlockProps({ className: "tm" });

	const wrapperStyle = {
		"--tm-pt": paddingTop,
		"--tm-pb": paddingBottom,
		"--tm-bg": bgUrl ? `url('${bgUrl}')` : undefined,
	};

	const updateItem = (index, key, value) => {
		const next = items.map((item, i) =>
			i === index ? { ...item, [key]: value } : item
		);
		setAttributes({ items: next });
	};

	const addItem = () => {
		setAttributes({ items: [...items, { quote: "", author: "", rating: 5 }] });
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Section Settings", "ai-zippy-child")} initialOpen={true}>
					<TextControl
						label={__("Heading", "ai-zippy-child")}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
					<p style={{ fontWeight: 600, marginBottom: "4px" }}>
						{__("Background image", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => setAttributes({ bgUrl: media.url, bgId: media.id })}
							allowedTypes={["image"]}
							value={bgId}
							render={({ open }) => (
								<Button variant="secondary" onClick={open} style={{ display: "block", marginBottom: "6px" }}>
									{bgUrl ? __("Replace background", "ai-zippy-child") : __("Upload background", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{bgUrl && (
						<Button variant="link" isDestructive onClick={() => setAttributes({ bgUrl: "", bgId: 0 })} style={{ display: "block", marginBottom: "12px" }}>
							{__("Remove background", "ai-zippy-child")}
						</Button>
					)}
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

				<PanelBody title={__("Testimonials", "ai-zippy-child")} initialOpen={true}>
					<SelectControl
						label={__("Reviews mode", "ai-zippy-child")}
						value={mode}
						options={[
							{ label: __("Custom cards", "ai-zippy-child"), value: "custom" },
							{ label: __("Shortcode", "ai-zippy-child"), value: "shortcode" },
						]}
						onChange={(value) => setAttributes({ mode: value })}
					/>
				
					{mode === "shortcode" ? (
						<TextControl
							label={__("Shortcode", "ai-zippy-child")}
							value={shortcode}
							onChange={(value) => setAttributes({ shortcode: value })}
							help={__("e.g. [my-google-reviews id=\"123\"]", "ai-zippy-child")}
						/>
					) : (
						<>
							{items.map((item, index) => (
								<div key={index} style={{ borderTop: "1px solid #ddd", paddingTop: "12px", marginBottom: "16px" }}>
									<p style={{ fontWeight: 600, marginBottom: "6px" }}>
										{__("Card", "ai-zippy-child")} {index + 1}
									</p>
									<TextareaControl
										label={__("Quote", "ai-zippy-child")}
										value={item.quote}
										onChange={(v) => updateItem(index, "quote", v)}
										rows={3}
									/>
									<TextControl
										label={__("Author name", "ai-zippy-child")}
										value={item.author}
										onChange={(v) => updateItem(index, "author", v)}
									/>
									<RangeControl
										label={__("Rating", "ai-zippy-child")}
										value={item.rating}
										onChange={(v) => updateItem(index, "rating", v)}
										min={1}
										max={5}
									/>
									{items.length > 1 && (
										<Button variant="link" isDestructive onClick={() => removeItem(index)}>
											{__("Remove card", "ai-zippy-child")}
										</Button>
									)}
								</div>
							))}
							<Button variant="secondary" onClick={addItem} style={{ marginTop: "8px" }}>
								{__("+ Add testimonial", "ai-zippy-child")}
							</Button>
						</>
					)}
				</PanelBody>
			</InspectorControls>

			{/* Editor preview */}
			<div {...blockProps} style={wrapperStyle}>
				<div className="tm__bg" aria-hidden="true" />
				<div className="tm__inner">
					{heading && <h2 className="tm__heading">{heading}</h2>}
			
					{mode === "shortcode" ? (
						<div className="tm__shortcode-preview">
							<p>{shortcode
								? shortcode
								: __("[ Shortcode will render here on the front end ]", "ai-zippy-child")
							}</p>
						</div>
					) : (
						<div className="tm__grid">
							{items.map((item, index) => (
								<div key={index} className="tm__card">
									<div className="tm__card-quote">
										<span className="tm__quote-icon" aria-hidden="true">"</span>
										{item.quote && <p className="tm__quote">{item.quote}</p>}
									</div>
									<div className="tm__card-footer">
										{item.author && <p className="tm__author">{item.author}</p>}
										<StarRating rating={item.rating} />
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
