<?php
	header("Access-Control-Allow-Origin: *");
?>
<?php
    if(array_key_exists("currPage", $_POST)){
    	$dir = './../../' . $_POST["currPage"] . '/';
    	$fi = new FilesystemIterator($dir, FilesystemIterator::SKIP_DOTS);
    	$numberOfImages = iterator_count($fi);
    	echo $numberOfImages;
    }
    else{
    	echo "Invalid Parameters";
    }
?>