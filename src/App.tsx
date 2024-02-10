import List from "@mui/material/List"
import { Box, Button } from "@mui/material"
import "./App.css"
import { useEffect, useState } from "react"
import OuterList from "./components/OuterList"
import IService from "./types/IService"

export default function App() {
	const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
	const [selectedInnerIndex, setSelectedInnerIndex] = useState<null | number>(
		null
	)
	const [data, setData] = useState<null | IService[]>(null)
	const [refetch, setRefetch] = useState(false)

	const handleClick = (index: number) => {
		if (selectedIndex === index) {
			setSelectedIndex(null)
		} else {
			setSelectedIndex(index)
		}
	}

	const handleInnerClick = (index: number) => {
		if (selectedInnerIndex === index) {
			setSelectedInnerIndex(null)
		} else {
			setSelectedInnerIndex(index)
		}
	}

	useEffect(() => {
		fetch("http://localhost:3000/services")
			.then(res => res.json())
			.then(data => setData(data))
	}, [refetch])

	const sortedData = data && [...data].sort((a, b) => a.sorthead - b.sorthead)

	return (
		<Box>
			<Button
				variant="contained"
				onClick={() => setRefetch(prev => !prev)}
			>
				<span>refetch</span>
			</Button>

			<List
				sx={{
					width: "100%",
					maxWidth: 460,
					minWidth: 460,
					bgcolor: "#181818",
					marginTop: 2
				}}
				component="nav"
			>
				<OuterList
					data={sortedData}
					handleClick={handleClick}
					selectedIndex={selectedIndex}
					selectedInnerIndex={selectedInnerIndex}
					handleInnerClick={handleInnerClick}
				/>
			</List>
		</Box>
	)
}
