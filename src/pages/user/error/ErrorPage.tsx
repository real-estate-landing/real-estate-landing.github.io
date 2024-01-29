import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Paper>
      <Box sx={{boxShadow:"0 0 10px 1px lightgrey",padding:'10px',width:'100%', maxWidth:'400px',borderRadius:'10px',margin:'10% auto',height:"auto",display:'flex',flexDirection:'column',gap:'10px'}}>   
        <h3 style={{fontWeight:'bold',fontSize:'20px'}}>Произошла ошибка</h3>
        <Typography>
        Что-то пошло не так, пожалуйста, вернитесь на главную страницу
        </Typography>
        <Button onClick={() => navigate('/')} variant='contained'>
        вернуться на главную страницу
        </Button>
      </Box>  
    </Paper>
  )}
export default ErrorPage;