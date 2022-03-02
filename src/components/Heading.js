import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Divider, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Heading({ icon, heading, subtitle, buttonText, onClick, isLoading }) {
    return (
        <Stack>
            <Toolbar>
                <Stack
                    direction='row'
                    spacing={2}
                    justifyContent='space-between'
                    sx={{
                        width: '100%'
                    }}
                >
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <Avatar
                            sx={{
                                background: (theme) => theme.palette.background.default
                            }}
                        >
                            {icon}
                        </Avatar>
                        <Stack>
                            <Typography
                                variant='body1'
                            >
                                {heading}
                            </Typography>
                            <Typography
                                variant='caption'
                                fontFamily='SFProText-Regular'
                            >
                                {subtitle}
                            </Typography>
                        </Stack>
                    </Stack>
                    {buttonText &&
                        <LoadingButton
                            variant='contained'
                            onClick={onClick}
                            loading={isLoading}
                        >
                            {buttonText}
                        </LoadingButton>
                    }
                </Stack>
            </Toolbar>
            <Divider />
        </Stack>
    )
}
