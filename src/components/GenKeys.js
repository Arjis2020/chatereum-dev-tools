import { Key } from '@mui/icons-material'
import { Box, Button, Paper, Stack, Typography, Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import E2EE from '../encryption'
import Heading from './Heading'

export default function GenKeys() {
    const [keys, setKeys] = useState({
        public_key: sessionStorage.getItem('public_key'),
        private_key: sessionStorage.getItem('private_key')
    })
    const [isLoading, setLoading] = useState(false)
    const [snackbar, setSnackbar] = useState(false)

    const genKeys = async () => {
        setLoading(true)
        const keys = await E2EE.getKeys()
        setKeys(keys)
        setLoading(false)
        setSnackbar(true)
        sessionStorage.setItem('private_key', keys.private_key)
        sessionStorage.setItem('public_key', keys.public_key)
    }

    return (
        <Stack
            sx={{
                width: '100vw'
            }}
        >
            <Snackbar
                open={snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar(false)}
            >
                <Alert onClose={(event, reason) => {
                    if (reason === 'clickaway') {
                        return;
                    }

                    setSnackbar(false);
                }} severity="success" sx={{ width: '100%' }}>
                    Keys saved successfully!
                </Alert>
            </Snackbar>
            <Heading
                heading={"Generate Keys"}
                icon={<Key htmlColor='#304fff'/>}
                subtitle={'Generate keys to encrypt or decrypt plain text'}
                buttonText={'Generate'}
                onClick={genKeys}
                isLoading={isLoading}
            />
            <Stack
                spacing={2}
                direction='row'
                alignItems='start'
                justifyContent='center'
                sx={{
                    p: 2
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 0,
                        background: (theme) => theme.palette.background.default,
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        variant='body2'
                    >
                        {keys ?
                            <pre>{keys.public_key}</pre>
                            :
                            "Public Key"
                        }
                    </Typography>
                </Paper>
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 0,
                        background: (theme) => theme.palette.background.default,
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Typography
                        variant='body2'
                        noWrap
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        {
                            keys ?
                                <pre>{keys.private_key}</pre>
                                :
                                "Private Key"
                        }
                    </Typography>
                </Paper>
            </Stack>
        </Stack>
    )
}
