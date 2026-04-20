import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import {
	PanelBody,
	TextControl,
	TextareaControl,
	Button,
} from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		eyebrow,
		heading,
		outlets,
		formHeading,
		formShortcode,
		paddingTop,
		paddingBottom,
	} = attributes;

	const blockProps = useBlockProps({ className: "cr" });

	const wrapperStyle = {
		"--cr-pt": paddingTop,
		"--cr-pb": paddingBottom,
	};

	const updateOutlet = (index, key, value) => {
		const next = outlets.map((o, i) => (i === index ? { ...o, [key]: value } : o));
		setAttributes({ outlets: next });
	};

	const addOutlet = () => {
		setAttributes({
			outlets: [
				...outlets,
				{ name: "", contact: "", hours: "", reserveUrl: "#", reserveLabel: "Reserve Now" },
			],
		});
	};

	const removeOutlet = (index) => {
		setAttributes({ outlets: outlets.filter((_, i) => i !== index) });
	};

	return (
		<>
			<InspectorControls>
				{/* ---- Section text ---- */}
				<PanelBody title={__("Left Column", "ai-zippy-child")} initialOpen={true}>
					<TextControl
						label={__("Eyebrow", "ai-zippy-child")}
						value={eyebrow}
						onChange={(v) => setAttributes({ eyebrow: v })}
					/>
					<TextareaControl
						label={__("Heading", "ai-zippy-child")}
						value={heading}
						onChange={(v) => setAttributes({ heading: v })}
						rows={3}
					/>
				</PanelBody>

				{/* ---- Outlets ---- */}
				<PanelBody title={__("Outlets", "ai-zippy-child")} initialOpen={true}>
					{outlets.map((outlet, index) => (
						<div
							key={index}
							style={{ borderTop: "1px solid #ddd", paddingTop: "12px", marginBottom: "16px" }}
						>
							<p style={{ fontWeight: 600, marginBottom: "6px" }}>
								{__("Outlet", "ai-zippy-child")} {index + 1}
							</p>
							<TextControl
								label={__("Name", "ai-zippy-child")}
								value={outlet.name}
								onChange={(v) => updateOutlet(index, "name", v)}
							/>
							<TextareaControl
								label={__("Contact info", "ai-zippy-child")}
								value={outlet.contact}
								onChange={(v) => updateOutlet(index, "contact", v)}
								rows={2}
								help={__("Use a new line for each line of contact info.", "ai-zippy-child")}
							/>
							<TextareaControl
								label={__("Opening hours", "ai-zippy-child")}
								value={outlet.hours}
								onChange={(v) => updateOutlet(index, "hours", v)}
								rows={3}
							/>
							<TextControl
								label={__("Reserve button label", "ai-zippy-child")}
								value={outlet.reserveLabel}
								onChange={(v) => updateOutlet(index, "reserveLabel", v)}
							/>
							<TextControl
								label={__("Reserve button URL", "ai-zippy-child")}
								value={outlet.reserveUrl}
								onChange={(v) => updateOutlet(index, "reserveUrl", v)}
							/>
							{outlets.length > 1 && (
								<Button
									variant="link"
									isDestructive
									onClick={() => removeOutlet(index)}
								>
									{__("Remove outlet", "ai-zippy-child")}
								</Button>
							)}
						</div>
					))}
					<Button variant="secondary" onClick={addOutlet} style={{ marginTop: "8px" }}>
						{__("+ Add outlet", "ai-zippy-child")}
					</Button>
				</PanelBody>

				{/* ---- Form ---- */}
				<PanelBody title={__("Right Column — Form", "ai-zippy-child")} initialOpen={true}>
					<TextControl
						label={__("Form heading", "ai-zippy-child")}
						value={formHeading}
						onChange={(v) => setAttributes({ formHeading: v })}
					/>
					<TextControl
						label={__("Form shortcode", "ai-zippy-child")}
						value={formShortcode}
						onChange={(v) => setAttributes({ formShortcode: v })}
						help={__('e.g. [contact-form-7 id="123"]', "ai-zippy-child")}
					/>
				</PanelBody>

				{/* ---- Layout ---- */}
				<PanelBody title={__("Layout", "ai-zippy-child")} initialOpen={false}>
					<TextControl
						label={__("Padding top", "ai-zippy-child")}
						value={paddingTop}
						onChange={(v) => setAttributes({ paddingTop: v })}
						help={__("CSS value e.g. 80px, 6rem", "ai-zippy-child")}
					/>
					<TextControl
						label={__("Padding bottom", "ai-zippy-child")}
						value={paddingBottom}
						onChange={(v) => setAttributes({ paddingBottom: v })}
						help={__("CSS value e.g. 80px, 6rem", "ai-zippy-child")}
					/>
				</PanelBody>
			</InspectorControls>

			{/* ---- Editor preview ---- */}
			<div {...blockProps} style={wrapperStyle}>
				<div className="cr__inner">

					{/* Left */}
					<div className="cr__left">
						<div className="cr__header">
							{eyebrow && (
								<div className="cr__eyebrow">
									<span className="cr__eyebrow-line" aria-hidden="true" />
									<span className="cr__eyebrow-text">{eyebrow}</span>
								</div>
							)}
							{heading && <h2 className="cr__heading">{heading}</h2>}
						</div>

						<div className="cr__outlets">
							{outlets.map((outlet, index) => (
								<div key={index} className="cr__outlet">
									{outlet.name && <h3 className="cr__outlet-name">{outlet.name}</h3>}
									<div className="cr__outlet-body">
										{outlet.contact && (
											<div className="cr__outlet-contact">
												{outlet.contact.split("\n").map((line, i) => (
													<p key={i}>{line}</p>
												))}
											</div>
										)}
										<div className="cr__outlet-right">
											{outlet.hours && (
												<div className="cr__outlet-hours">
													{outlet.hours.split("\n").map((line, i) => (
														<p key={i}>{line}</p>
													))}
												</div>
											)}
											{outlet.reserveLabel && (
												<a className="cr__reserve-btn" href={outlet.reserveUrl}>
													{outlet.reserveLabel}
												</a>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right */}
					<div className="cr__right">
						{formHeading && <h2 className="cr__form-heading">{formHeading}</h2>}
						<div className="cr__form-preview">
							{formShortcode
								? <p className="cr__form-shortcode">{formShortcode}</p>
								: <p className="cr__form-placeholder">{__("[ Form shortcode will render here ]", "ai-zippy-child")}</p>
							}
						</div>
					</div>

				</div>
			</div>
		</>
	);
}
