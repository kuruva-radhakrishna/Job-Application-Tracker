import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography,} from '@mui/material';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropDialog = ({ open, onClose, imageUrl, onCropComplete }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    aspect: 1, // Force circular crop
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imageRef, setImageRef] = useState(null);

  const onImageLoad = (image) => {
    setImageRef(image);
    // Center the initial crop
    const width = Math.min(90, (image.width / image.height) * 90);
    setCrop({
      unit: '%',
      width,
      x: (100 - width) / 2,
      y: 5,
      aspect: 1
    });
  };

  const getCroppedImg = () => {
    if (!imageRef || !completedCrop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageRef,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = 'cropped.jpeg';
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const handleSave = async () => {
    try {
      const croppedImage = await getCroppedImg();
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
      onClose();
    } catch (e) {
      console.error('Error cropping image:', e);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        Adjust Profile Picture
        <Typography variant="body2" color="textSecondary">
          Drag to move and resize the circle to crop your photo
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          my: 2,
          '& .ReactCrop': {
            maxHeight: '70vh',
            '& img': {
              maxHeight: '70vh'
            }
          }
        }}>
          <ReactCrop
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            circularCrop
          >
            <img
              src={imageUrl}
              onLoad={(e) => onImageLoad(e.currentTarget)}
              alt="Crop me"
              style={{ maxWidth: '100%' }}
            />
          </ReactCrop>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          disabled={!completedCrop?.width || !completedCrop?.height}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropDialog; 