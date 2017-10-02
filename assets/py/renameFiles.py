import os
from PIL import Image

pathOrigin="C:/Users/arnol/Desktop/arnoldzhouphotographwebsite"

paths = ["/Portraits",
		"/Events",
		"/Street",
		"/ProposalandGraduation"]

changePaths = ["/toaddChange"]

def string_is_int(s):
	try:
		int(s)
		return True
	except ValueError:
		return False

def renameFileHelper(path_, it, rename, filename, image_compression, maxNum, hasErrorFile):
	new_name = rename + str(it) + ".jpg"
	#if file name is already numbered then continue
	if(string_is_int(filename.split('.')[0]) and len(filename.split('.')) == 2 and int(filename.split('.')[0]) < maxNum and rename == ""):
		return False
	#if file exists just add one and rename to error file
	if(os.path.isfile(os.path.join(path_, new_name))):
		print("File " + path_ + '/' + new_name + " exists.\n")
		temp_name = "error" + str(it) + ".jpg"
		print("SETTING ERROR FILE" + str(it))
		try:
			hasErrorFile.index(path_)
		except ValueError:
			hasErrorFile.append(path_)
		os.rename(os.path.join(path_, filename), os.path.join(path_, temp_name))
		#add logic here if you want to rename a file that currently exists.
	else:#rename file and resize it
		os.rename(os.path.join(path_, filename), os.path.join(path_, new_name))
		if(rename == ""):
			im = Image.open(os.path.join(path_, new_name))
			im = im.resize((int(im.size[0]/image_compression), int(im.size[1]/image_compression)), Image.ANTIALIAS)
			im.save(os.path.join(path_, new_name), quality=85)
	return True

#Only call if there's at least one file which isn't an actual number
def renameFiles(path_, maxNum, rename, isSmall):
	it = 0
	small_image = 5
	large_image = 3
	hasErrorFile = []
	#iterate through files
	for filename in os.listdir(path_):
		iterateBool = False
		if(isSmall):
			iterateBool = renameFileHelper(path_, it, rename, filename, small_image, maxNum, hasErrorFile)
		else:
			iterateBool = renameFileHelper(path_, it, rename, filename, large_image, maxNum, hasErrorFile)
		if(iterateBool):
			it = it + 1
	
	return hasErrorFile

#iterate through folders
def mainfunc(currPaths):
	for path_ in currPaths:
		path_ = pathOrigin + path_
		rename = ""
		numberOfFiles = len([fname for fname in os.listdir(path_) if os.path.isfile(os.path.join(path_, fname))])
		errPaths = renameFiles(path_, numberOfFiles, rename, True)
		if(errPaths != []):
			print("UNRESOLVED ERROR FILES IN:\n")
			for val in errPaths:
				print(val + '\n')
		#Doing large now
		path_ = path_ + "Large"
		numberOfFiles = len([fname for fname in os.listdir(path_) if os.path.isfile(os.path.join(path_, fname))])
		errPaths = renameFiles(path_, numberOfFiles, rename, False)
		if(errPaths != []):
			print("UNRESOLVED ERROR FILES IN:\n")
			for val in errPaths:
				print(val + '\n')

def main():
	mainfunc(paths)

if __name__ == "__main__":
    main()