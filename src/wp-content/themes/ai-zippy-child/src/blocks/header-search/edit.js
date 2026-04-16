import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from "@wordpress/block-editor";
import { Button, PanelBody, TextControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { placeholder, buttonLabel, iconUrl, iconId, modalTitle } = attributes;
	const blockProps = useBlockProps({
		className: "ai-zippy-child-header-search",
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Search Settings", "ai-zippy-child")}
					initialOpen={true}
				>
					<TextControl
						label={__("Button aria-label", "ai-zippy-child")}
						value={buttonLabel}
						onChange={(value) => setAttributes({ buttonLabel: value })}
					/>
					<TextControl
						label={__("Modal title", "ai-zippy-child")}
						value={modalTitle}
						onChange={(value) => setAttributes({ modalTitle: value })}
					/>
					<TextControl
						label={__("Search placeholder", "ai-zippy-child")}
						value={placeholder}
						onChange={(value) => setAttributes({ placeholder: value })}
					/>
				</PanelBody>

				<PanelBody
					title={__("Search Icon", "ai-zippy-child")}
					initialOpen={true}
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ iconUrl: media.url, iconId: media.id })
							}
							allowedTypes={["image"]}
							value={iconId}
							render={({ open }) => (
								<Button variant="secondary" onClick={open}>
									{iconUrl
										? __("Replace icon image", "ai-zippy-child")
										: __("Upload icon image", "ai-zippy-child")}
								</Button>
							)}
						/>
					</MediaUploadCheck>

					{iconUrl ? (
						<>
							<div style={{ marginTop: "12px" }}>
								<img
									src={iconUrl}
									alt=""
									style={{ display: "block", width: "48px", maxWidth: "100%" }}
								/>
							</div>
							<Button
								variant="link"
								isDestructive
								onClick={() => setAttributes({ iconUrl: "", iconId: 0 })}
							>
								{__("Remove icon image", "ai-zippy-child")}
							</Button>
						</>
					) : null}
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<button type="button" className="ai-zippy-child-header-search__trigger">
					{iconUrl ? (
						<img
							className="ai-zippy-child-header-search__icon-image"
							src={iconUrl}
							alt=""
						/>
					) : (
						<span className="ai-zippy-child-header-search__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
								<path d="M10.5 3a7.5 7.5 0 1 1 0 15a7.5 7.5 0 0 1 0-15Zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11Zm10.207 14.793l-3.647-3.646a1 1 0 0 0-1.414 1.414l3.647 3.646a1 1 0 0 0 1.414-1.414Z" fill="currentColor" />
							</svg>
						</span>
					)}
				</button>
			</div>
		</>
	);
}
