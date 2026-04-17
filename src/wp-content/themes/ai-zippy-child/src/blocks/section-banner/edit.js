import { __ } from "@wordpress/i18n";
import {
	InspectorControls,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { heading, bgUrl, bgId, paddingTop, paddingBottom } = attributes;

	const blockProps = useBlockProps();

	const wrapperStyle = {
		"--sb-bg": bgUrl ? `url('${bgUrl}')` : undefined,
		"--sb-pt": paddingTop,
		"--sb-pb": paddingBottom,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Banner", "ai-zippy-child")} initialOpen={true}>
					<TextControl
						label={__("Heading", "ai-zippy-child")}
						value={heading}
						onChange={(value) => setAttributes({ heading: value })}
					/>
					<p style={{ marginBottom: "4px", fontWeight: 600 }}>
						{__("Background image", "ai-zippy-child")}
					</p>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ bgUrl: media.url, bgId: media.id })
							}
							allowedTypes={["image"]}
							value={bgId}
							render={({ open }) => (
								<Button
									variant="secondary"
									onClick={open}
									style={{ marginBottom: "8px" }}
								>
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
						help={__("CSS value e.g. 100px, 8rem", "ai-zippy-child")}
					/>
					<TextControl
						label={__("Padding bottom", "ai-zippy-child")}
						value={paddingBottom}
						onChange={(value) => setAttributes({ paddingBottom: value })}
						help={__("CSS value e.g. 100px, 8rem", "ai-zippy-child")}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} style={wrapperStyle}>
				<div className="sb__bg" aria-hidden="true" />
				<div className="sb__inner">
					{heading && <h2 className="sb__heading">{heading}</h2>}
				</div>
			</div>
		</>
	);
}
