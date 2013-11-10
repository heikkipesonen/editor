<html>
	<head>
	<title>builder</title>
	<meta charset="utf-8">

	

<?php
	$dev = true;



	function getFolder($root){		
		$root_folder = scandir($root);
		$files = array();
		foreach ($root_folder as $key => $folder) {
			if ($folder != '..' && $folder != '.'){
				if (is_dir($folder)){
					$subfolder = getFolder($folder);
					foreach ($subfolder as $key => $sf) {
						if (!startsWith($sf,'.' )){
							$files[] = $folder.'/'.$sf;
						}
					}
				} else {
					if (!startsWith($folder ,'.')){
						$files[] = $folder;
					}
				}
			}
		}
		return $files;
	}

	function startsWith($haystack, $needle){
	    return !strncmp($haystack, $needle, strlen($needle));
	}

	function addCss($filename){
		echo '<link rel="stylesheet" type="text/css" href="'.$filename.'">';
	}

	function addScripts($scripts){
		global $dev;
		foreach ($scripts as $script){
			if ($dev){
				echo '<script type="text/javascript" src="'.$script.'"></script>';
			} else {		
				echo '<script type="text/javascript">';
				include($script);
				echo '</script>';
			}
		}
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



	$templates = scandir('templates');
	echo '<div style="display:none" id="templates">';
	foreach ($templates as $key => $value) {
		if ($value != '.' && $value != '..'){
			include('templates/'.$value);
		}
	}
	echo '</div>';

	addScripts($scripts);
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