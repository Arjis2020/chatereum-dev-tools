import { Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Decrypt from './Decrypt'
import Encrypt from './Encrypt'
import GenKeys from './GenKeys'
import Menu from './Menu'

export default function Page() {
    const [index, setIndex] = useState(0)

    const changePage = (index) => {
        setIndex(index)
    }

    return (
        <Stack
            direction='row'
        >
            <Menu
                index={changePage}
            />
            {
                index == 0 ?
                    <GenKeys />
                    :
                    index == 1 ?
                        <Encrypt />
                        :
                        index == 2 ?
                            <Decrypt />
                            :
                            null
            }
        </Stack>
    )
}
