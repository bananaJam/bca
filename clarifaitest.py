#https://github.com/clarifai/clarifai-python

from clarifai.client import ClarifaiApi
import json

clarifai_api = ClarifaiApi()
result = clarifai_api.tag_images(open('/Users/Brian/Pictures/drawings/Christmas Tree.jpg', 'rb'));

cutResult = result['results'][0]['result']['tag']['classes']
for word in cutResult:
	print word