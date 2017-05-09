import React from 'react';
//Rendering the IPs in unordered list
const IPList = (props) => {
	const ips = props.ips;
	const ipItems = ips.map((ip) =>
		<IpItems key={ip} value={ip} />
	);

	return(
		<ul className="list-group">
			{ipItems}
		</ul>
	);
}

//li elements of IPs
function IpItems(props) {
	return<li className="list-group-item">
		{props.value}
	</li>;
}

export default IPList;
