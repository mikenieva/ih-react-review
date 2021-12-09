import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Countries(props) {

	const allCountries = props.allCountries

	return (
		<>
		<div className="flex border-r border-gray-200 pb-4 bg-white overflow-y-auto">
				<nav className="flex px-2 space-y-8 bg-white w-1/4" aria-label="Sidebar">
					<div className="w-full">
						{
							allCountries.map((e, index) => {
								return (
									<Link key={index} to={e.cca3} className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-sm font-medium underline">
										{e.name.common}
									</Link>
								)
							})
						}
					</div>
				</nav>
			<Outlet />
		</div>
		</>
	)
}
