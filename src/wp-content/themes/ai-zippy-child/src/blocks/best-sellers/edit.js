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
	RangeControl,
	ToggleControl,
	Button,
	SelectControl,
	__experimentalDivider as Divider,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { mode, heading, items, limit, slidesPerView, loop, autoplay, autoplayDelay } =
		attributes;

	const blockProps = useBlockProps();

	// ----- Manual item helpers -----
	const updateItem = (index, fields) => {
		const updated = items.map((item, i) =>
			i === index ? { ...item, ...fields } : item
		);
		setAttributes({ items: updated });
	};

	const addItem = () => {
		setAttributes({
			items: [
				...items,
				{ imageUrl: "", imageId: 0, title: "", linkUrl: "#", newTab: false },
			],
		});
	};

	const removeItem = (index) => {
		setAttributes({ items: items.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				{/* ---- Mode + Heading ---- */}
				<PanelBody title={__("Carousel Settings", "ai-zippy-child")} initialOpen={true}>
					<SelectControl
						label={__("Mode", "ai-zippy-child")}
						value={mode}
						options={[
							{ label: __("Auto — WooCommerce best sellers", "ai-zippy-child"), value: "auto" },
							{ label: __("Manual — custom items", "ai-zippy-child"), value: "manual" },
						]}
						onChange={(value) => setAttributes({ mode: value })}
					/>
					<TextControl
						label={__("Heading", "ai-zippy-child")}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
					<RangeControl
						label={__("Slides visible (desktop)", "ai-zippy-child")}
						value={slidesPerView}
						onChange={(value) => setAttributes({ slidesPerView: value })}
						min={1}
						max={6}
					/>
					<ToggleControl
						label={__("Loop", "ai-zippy-child")}
						checked={loop}
						onChange={(value) => setAttributes({ loop: value })}
					/>
					<ToggleControl
						label={__("Autoplay", "ai-zippy-child")}
						checked={autoplay}
						onChange={(value) => setAttributes({ autoplay: value })}
					/>
					{autoplay && (
						<RangeControl
							label={__("Autoplay delay (ms)", "ai-zippy-child")}
							value={autoplayDelay}
							onChange={(value) => setAttributes({ autoplayDelay: value })}
							min={1000}
							max={10000}
							step={500}
						/>
					)}
				</PanelBody>

				{/* ---- Auto mode settings ---- */}
				{mode === "auto" && (
					<PanelBody title={__("Auto Mode", "ai-zippy-child")} initialOpen={false}>
						<RangeControl
							label={__("Number of products", "ai-zippy-child")}
							value={limit}
							onChange={(value) => setAttributes({ limit: value })}
							min={2}
							max={20}
						/>
					</PanelBody>
				)}

				{/* ---- Manual mode item editor ---- */}
				{mode === "manual" && (
					<PanelBody title={__("Items", "ai-zippy-child")} initialOpen={true}>
						{items.map((item, index) => (
							<div key={index} style={{ marginBottom: "20px" }}>
								<p style={{ fontWeight: 600, margin: "0 0 8px" }}>
									{__("Item", "ai-zippy-child")} {index + 1}
								</p>

								{/* Image upload */}
								<MediaUploadCheck>
									<MediaUpload
										onSelect={(media) =>
											updateItem(index, { imageUrl: media.url, imageId: media.id })
										}
										allowedTypes={["image"]}
										value={item.imageId}
										render={({ open }) => (
											<Button
												variant="secondary"
												onClick={open}
												style={{ marginBottom: "6px", display: "block" }}
											>
												{item.imageUrl
													? __("Replace image", "ai-zippy-child")
													: __("Upload image", "ai-zippy-child")}
											</Button>
										)}
									/>
								</MediaUploadCheck>
								{item.imageUrl && (
									<Button
										variant="link"
										isDestructive
										onClick={() => updateItem(index, { imageUrl: "", imageId: 0 })}
										style={{ display: "block", marginBottom: "8px" }}
									>
										{__("Remove image", "ai-zippy-child")}
									</Button>
								)}

								<TextControl
									label={__("Title", "ai-zippy-child")}
									value={item.title}
									onChange={(value) => updateItem(index, { title: value })}
								/>
								<TextControl
									label={__("Link URL", "ai-zippy-child")}
									value={item.linkUrl}
									onChange={(value) => updateItem(index, { linkUrl: value })}
								/>
								<ToggleControl
									label={__("Open in new tab", "ai-zippy-child")}
									checked={item.newTab}
									onChange={(value) => updateItem(index, { newTab: value })}
								/>

								{items.length > 1 && (
									<Button
										variant="link"
										isDestructive
										onClick={() => removeItem(index)}
									>
										{__("Remove item", "ai-zippy-child")}
									</Button>
								)}

								{index < items.length - 1 && <Divider />}
							</div>
						))}

						<Button variant="secondary" onClick={addItem} style={{ width: "100%" }}>
							{__("+ Add item", "ai-zippy-child")}
						</Button>
					</PanelBody>
				)}
			</InspectorControls>

			{/* ---- Editor preview ---- */}
			<div {...blockProps}>
				<div className="bs__header">
					<h2 className="bs__heading">
						{heading || __("Our Best Sellers", "ai-zippy-child")}
					</h2>
					<div className="bs__nav">
						<button className="bs__nav-btn bs__nav-prev" aria-label={__("Previous", "ai-zippy-child")}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>
						<button className="bs__nav-btn bs__nav-next" aria-label={__("Next", "ai-zippy-child")}>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
								<polyline points="9 6 15 12 9 18" />
							</svg>
						</button>
					</div>
				</div>

				{mode === "auto" ? (
					<p className="bs__editor-notice">
						{__("Auto mode: best-selling products will display here on the front end.", "ai-zippy-child")}
					</p>
				) : (
					<div className="bs__editor-items">
						{items.map((item, index) => (
							<div key={index} className="bs__editor-item">
								{item.imageUrl ? (
									<img src={item.imageUrl} alt={item.title} className="bs__editor-item-img" />
								) : (
									<div className="bs__editor-item-placeholder">{__("No image", "ai-zippy-child")}</div>
								)}
								{item.title && (
									<p className="bs__editor-item-title">{item.title}</p>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
