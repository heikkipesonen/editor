<html>
	<head>
	<title>builder</title>
	<meta charset="utf-8">

	

<?php
	function addCss($filename){
		echo '<link rel="stylesheet" type="text/css" href="'.$filename.'">';
	}

	function addScript($filename){
		echo '<script type="text/javascript" src="'.$filename.'"></script>';
	}

	$scripts = array(
		"../src/jquery-2.0.0.min.js",
		"../src/jquery.hammer.js",		
		"../jq.extend/jq.extend.js",
		"../events/events.js",
		"../dropInput/dropInput.js"
	);
	

	$js = scandir('js');

	foreach ($js as $key => $value) {
		if ($value != '.' && $value != '..'){
			$scripts[] = 'js/'.$value;
		}
	}


	$js = scandir('css');

	foreach ($js as $key => $value) {
		if ($value != '.' && $value != '..'){
			addCss('css/'.$value);
		}
	}


	foreach ($scripts as $script){
		addScript($script);
	}

	$templates = scandir('templates');
	echo '<div style="display:none" id="templates">';
	foreach ($templates as $key => $value) {
		if ($value != '.' && $value != '..'){
			include('templates/'.$value);
		}
	}
	echo '</div>';
?>

	</head>
	<script type="text/javascript">

		$(function(){	
			BUILDER.init('#wrapper');
		});
	</script>
	<body>
		<div id="wrapper">
		</div>
	</body>

</html>