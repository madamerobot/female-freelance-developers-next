import React from 'react';

const Entry = ({ data }) => (
	<div className="main-col--section">
		<div className="main-col--section-header">
			<div>
				<span>
					{data.lastName},<br />
				</span>
				{data.firstName}
			</div>
		</div>
		<div className="main-col--section-body">
			{data.website ? (
				<div className="main-col--section-row">
					<div className="main-col--section-row-info">Website</div>
					<div>
						<a className="a-element" href={data.website}>
							{data.website}
						</a>
					</div>
				</div>
			) : null}
			<div className="main-col--section-row">
				<div className="main-col--section-row-info">Email</div>
				<div>
					<a className="a-element" href={`mailto:${data.email}?subject=Female Frontend Developers`}>
						{data.email}
					</a>
				</div>
			</div>
			{data.socialUrl ? (
				<div className="main-col--section-row">
					<div className="main-col--section-row-info">Social</div>
					<div>
						<a href={data.socialUrl}>@{data.socialHandle}</a>
					</div>
				</div>
			) : null}
			<div className="main-col--section-row">
				<div className="main-col--section-row-info">Expertise</div>
				<div>{data.expertise}</div>
			</div>
			{data.location ? (
				<div className="main-col--section-row">
					<div className="main-col--section-row-info">Location</div>
					<div>{data.location}</div>
				</div>
			) : null}
		</div>
	</div>
);

export default Entry;
