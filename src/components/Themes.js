import { createTheme } from '@mui/material/styles';

// export const lightTheme = {
//     body: '#FFF',
//     text: '#363537',
//     toggleBorder: '#FFF',
//     background: '#363537',
// }

export const lightTheme = createTheme({
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
    palette: {
        primary: {
            main: '#2b535e' // Red
        }
    }
})


export const darkTheme = {
    body: '#363537',
    text: '#FF4500',
    toggleBorder: '#6B8096',
    background: '#999',

}
