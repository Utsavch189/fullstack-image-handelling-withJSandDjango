import base64

file = open('file1.txt', 'rb')
encoded_data = file.read()
file.close()
#decode base64 string data
decoded_data=base64.b64decode((encoded_data))
#write the decoded data back to original format in  file
img_file = open('image.jpg', 'wb')
img_file.write(decoded_data)
img_file.close()