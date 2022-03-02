import { CopyAll, Https } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Container, Paper, Stack, TextField, Typography, Snackbar, Alert, IconButton } from '@mui/material'
import React, { useState } from 'react'
import E2EE from '../encryption'
import Heading from './Heading'

export default function Encrypt() {

  const [plainText, setPlainText] = useState(sessionStorage.getItem('plain_text') ? sessionStorage.getItem('plain_text') : "")
  const [encrypted, setEncrypted] = useState(sessionStorage.getItem('encrypted') ? JSON.parse(sessionStorage.getItem('encrypted')) : {})
  const [isLoading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    text: '',
    type: ''
  })

  const encrypt = async () => {
    setLoading(true)
    if (!sessionStorage.getItem('public_key')) {
      setSnackbar({
        open: false,
        text: 'Generate keys first to start encrypting!',
        type: 'error'
      })
      return
    }
    const cipherText = await E2EE.encrypt(sessionStorage.getItem('public_key'), sessionStorage.getItem('private_key'), plainText)
    setEncrypted(cipherText)
    sessionStorage.setItem('encrypted', JSON.stringify(cipherText))
    sessionStorage.setItem('plain_text', plainText)
    setLoading(false)
  }

  return (
    <Stack
      sx={{
        width: '100vw'
      }}
    >
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({
          open: false,
          text: ''
        })}
      >
        <Alert onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setSnackbar({
            open: false,
            text: ''
          });
        }} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.text}
        </Alert>
      </Snackbar>

      <Heading
        heading={"Encrypt"}
        icon={<Https htmlColor='#304fff'/>}
        subtitle={'Start encrypting plain text'}
      />

      <Stack
        spacing={2}
        sx={{
          p: 2
        }}
      >
        <TextField
          variant='outlined'
          label='Plain Text'
          placeholder='Enter text to be encrypted'
          fullWidth
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
          InputProps={{
            endAdornment:
              <LoadingButton
                variant='contained'
                onClick={encrypt}
                disabled={plainText.length === 0}
                loading={isLoading}
              >
                Encrypt
              </LoadingButton>
          }}
        />

        <Paper
          elevation={0}
          sx={{
            background: (theme) => theme.palette.background.default,
            p: 2
          }}
        >
          <Typography
            variant='caption'
            color='GrayText'
          >
            Encrypted message
          </Typography>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              variant='subtitle1'
              fontFamily='SFProText-Medium'
              noWrap
              marginTop={2}
            >
              {encrypted ? encrypted.cipher_text : "Encrypt text to see it here"}
            </Typography>
            {
              encrypted &&
              <IconButton
                onClick={() => navigator.clipboard.writeText(JSON.stringify(encrypted)).then(() => {
                  setSnackbar({
                    open: true,
                    text: 'Encrypted message copied to clipboard',
                    type: "success"
                  })
                })}
              >
                <CopyAll />
              </IconButton>
            }
          </Stack>
        </Paper>
      </Stack>
    </Stack>
  )
}
