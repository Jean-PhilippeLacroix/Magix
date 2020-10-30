const applyStyles = iframe => {
	let styles = {
		fontColor : "#fff",
		backgroundColor : "rgba(180, 180, 180, 0.3)",
		fontGoogleName : "Montserrat",
        fontSize : "18px",
	}
	
	iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}