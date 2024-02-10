import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { Box, Button, ListItem } from "@mui/material"
import "./App.css"
import { useEffect, useState } from "react"
import IService from "./types/IService"
import InnerList from "./components/InnerList"

export default function App() {
	const [selectedIndex, setSelectedIndex] = useState<null | number>(null)
	const [selectedInnerIndex, setSelectedInnerIndex] = useState<null | number>(
		null
	)
	const [data, setData] = useState<null>(null)
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
					maxWidth: 400,
					minWidth: 400,
					bgcolor: "#181818",
					marginTop: 2
				}}
				component="nav"
			>
				{data &&
					data.map((item: IService) => {
						return (
							<>
								{item.head === null && (
									<ListItem key={item.id}>
										<ListItemButton
											onClick={() =>
												item.node === 1 &&
												handleClick(item.id)
											}
										>
											<ListItemText
												sx={{
													"& span": {
														fontWeight:
															item.node === 1
																? 900
																: 400
													}
												}}
												primary={
													`${item.name}` +
													`${
														item.node === 0
															? ` - ${item.price}`
															: ""
													}`
												}
											/>
											{item.node === 1 ? (
												item.id === selectedIndex ? (
													<ExpandLess />
												) : (
													<ExpandMore />
												)
											) : (
												""
											)}
										</ListItemButton>
									</ListItem>
								)}
								<Collapse
									in={item.id === selectedIndex}
									timeout="auto"
									unmountOnExit
								>
									<InnerList
										data={data}
										item={item}
										selectedInnerIndex={selectedInnerIndex}
										handleInnerClick={handleInnerClick}
									/>
								</Collapse>
							</>
						)
					})}
			</List>
		</Box>
	)
}
