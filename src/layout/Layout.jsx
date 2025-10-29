import React from 'react'
import { Header } from '../components/header/Header'
import { BottomNav } from '../components/bottomNav/BottomNav'
import Categories from '../components/categories/Categories'
import { useMediaQuery } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
    const matches = useMediaQuery('(min-width: 800px)');
    const phone = useMediaQuery('(min-width: 600px)');


    return (
        <>
            <Header matches={matches} />
            {phone && <Categories matches={matches} />}
            <Outlet matches={matches} phone={phone} />
            <BottomNav />
        </>
    )
}
