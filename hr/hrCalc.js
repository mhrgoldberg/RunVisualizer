function calcHRZones() {
	const maxHR = document.forms[0].elements['max-hr'].value;
	const zone1 = [(maxHR * 0.50).toFixed(0), (maxHR * 0.60).toFixed(0)];
	const zone2 = [((maxHR * 0.60) + 1).toFixed(0), (maxHR * 0.70).toFixed(0)];
	const zone3 = [((maxHR * 0.70) + 1).toFixed(0), (maxHR * 0.70).toFixed(0)];
	const zone4 = [((maxHR * 0.80) + 1).toFixed(0), (maxHR * 0.70).toFixed(0)];
	const zone5 = [(maxHR * 0.90 + 1).toFixed(0), maxHR];
	document.getElementById("z1").innerHTML = `${zone1[0]} - ${zone1[1]}`;
	document.getElementById("z2").innerHTML = `${zone2[0]} - ${zone2[1]}`;
	document.getElementById("z3").innerHTML = `${zone3[0]} - ${zone3[1]}`;
	document.getElementById("z4").innerHTML = `${zone4[0]} - ${zone4[1]}`;
	document.getElementById("z5").innerHTML = `${zone5[0]} - ${zone5[1]}`;

}