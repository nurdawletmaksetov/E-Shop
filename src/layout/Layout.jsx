import React from 'react'
import { Header } from '../components/header/Header'
import { BottomNav } from '../components/bottomNav/BottomNav'
import Categories from '../components/categories/Categories'
import { useMediaQuery } from '@mantine/hooks'
import { Outlet } from 'react-router-dom'
import Footer from '../components/footer/Footer'

export const Layout = () => {
    const matches = useMediaQuery('(min-width: 800px)');
    const phone = useMediaQuery('(min-width: 500px)');

    const handleTopClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <>
            <Header matches={matches} handleTopClick={handleTopClick} />
            {phone && <Categories matches={matches} handleTopClick={handleTopClick} />}
            <Outlet matches={matches} phone={phone} handleTopClick={handleTopClick} />
            <BottomNav />
            <Footer />
        </>
    )
}
