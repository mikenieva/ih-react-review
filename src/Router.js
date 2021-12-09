import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Countries from './components/Countries'
import Country from './components/Country'

import CRUD from './components/CRUD'
import Home from './components/Home'
import Layout from './components/Layout'

import data from './countries.json'

const Router = () => {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route index element={<Home />} />
						<Route path="crud" element={<CRUD />} />
						<Route path="countries" element={<Countries allCountries={data} />}>
							<Route path=":id" element={<Country allCountries={data} />} />
						</Route>
					</Route>
					
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default Router