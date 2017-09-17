import os
from PIL import Image

paths = ["C:/xampp/htdocs/Photo Website/Portraits",
			"C:/xampp/htdocs/Photo Website/Events",
			"C:/xampp/htdocs/Photo Website/Street",
			"C:/xampp/htdocs/Photo Website/ProposalandGraduation"]

def string_is_int(s):
	try:
		int(s)
		return True
	except ValueError:
		return False

#Only call if there's at least one file which isn't an actual number
def renameFiles(path_, maxNum):
	it = 0
	small_image = 5
	large_image = 3
	for filename in os.listdir(path_):
		if(it >= maxNum):
			print(it)
			print(maxNum)
			print("ERROR: EXCEEDED MAX FILE NAME")
			break
		if(string_is_int(filename.split('.')[0]) and len(filename.split('.')) == 2 and int(filename.split('.')[0]) < maxNum):
			continue
		new_name = "" + str(it) + ".jpg"
		while(it < maxNum):
			if(os.path.isfile(os.path.join(path_, new_name))):
				it = it + 1
				new_name = "" + str(it) + ".jpg"
			else:
				os.rename(os.path.join(path_, filename), os.path.join(path_, new_name))
				im = Image.open(os.path.join(path_, new_name))
				im = im.resize((im.size[0]/small_image, im.size[1]/small_image), Image.ANTIALIAS)
				im.save(os.path.join(path_, new_name), quality=85)
				it = it + 1
				break

for path_ in paths:
	numberOfFiles = len([fname for fname in os.listdir(path_) if os.path.isfile(os.path.join(path_, fname))])
	renameFiles(path_, numberOfFiles)