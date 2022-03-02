import { Key } from '@mui/icons-material'
import { Stack, TextField, Paper, Typography, IconButton } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import React, { useState } from 'react'
import { Visibility } from '@mui/icons-material'
import Heading from './Heading'
import E2EE from '../encryption'

export default function Decrypt() {

    const [encrypted, setEncrypted] = useState("")
    const [decrypted, setDecrypted] = useState("")
    const [isLoading, setLoading] = useState(false)

    const decrypt = async () => {
        setLoading(true)
        const payload = JSON.parse(encrypted)
        const decrypted = await E2EE.decrypt(payload.aes_key, payload.iv, sessionStorage.getItem('private_key'), payload.cipher_text)
        setDecrypted(decrypted)
        setLoading(false)
    }

    return (
        <Stack
            sx={{
                width: '100vw'
            }}
        >
            <Heading
                heading='Decrypt'
                subtitle='Start decrypting encrypted messages'
                icon={<Visibility htmlColor='#304fff'/>}
            />

            <Stack
                spacing={2}
                sx={{
                    p: 2
                }}
            >
                <TextField
                    variant='outlined'
                    label='Encrypted message'
                    placeholder='Enter text to be encrypted'
                    fullWidth
                    multiline
                    rows={3}
                    value={encrypted}
                    onChange={(e) => setEncrypted(e.target.value)}
                    InputProps={{
                        endAdornment:
                            <LoadingButton
                                variant='contained'
                                onClick={decrypt}
                                disabled={encrypted.length === 0}
                                loading={isLoading}
                            >
                                Decrypt
                            </LoadingButton>,
                            sx: {
                                fontFamily: 'SFProText-Regular',
                                fontSize: '14px'
                            }
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
                        Decrypted message
                    </Typography>
                    <Typography
                        variant='subtitle1'
                        fontFamily='SFProText-Medium'
                        noWrap
                        marginTop={2}
                    >
                        {decrypted ? decrypted : "Decrypt message to see it here"}
                    </Typography>
                </Paper>
            </Stack>
        </Stack>
    )
}
