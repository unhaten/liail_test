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
					maxWidth: 420,
					minWidth: 350,
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
									<List component="div" disablePadding>
										{data.map((item2: IService) => {
											return (
												<>
													{item2.head === item.id && (
														<>
															<ListItem
																key={item2.id}
																sx={{ ml: 2 }}
															>
																<ListItemButton
																	onClick={() =>
																		handleInnerClick(
																			item2.id
																		)
																	}
																>
																	<ListItemText
																		sx={{
																			"& span":
																				{
																					fontWeight:
																						item.node ===
																						1
																							? 600
																							: 400
																				}
																		}}
																		primary={
																			item2.name
																		}
																	/>
																	{item.node ===
																	1 ? (
																		item2.id ===
																		selectedInnerIndex ? (
																			<ExpandLess />
																		) : (
																			<ExpandMore />
																		)
																	) : (
																		""
																	)}
																</ListItemButton>
															</ListItem>
															<Collapse
																in={
																	item2.id ===
																	selectedInnerIndex
																}
																timeout="auto"
																unmountOnExit
															>
																<List
																	component="div"
																	disablePadding
																	sx={{
																		ml: 2
																	}}
																>
																	{data.map(
																		(
																			item3: IService
																		) => {
																			return (
																				<>
																					{item3.head ===
																						item2.id && (
																						<ListItem>
																							<ListItemButton>
																								<ListItemText
																									primary={
																										`${item3.name}` +
																										`${
																											item.node ===
																											1
																												? ` - ${item3.price}`
																												: ""
																										}`
																									}
																								/>
																							</ListItemButton>
																						</ListItem>
																					)}
																				</>
																			)
																		}
																	)}
																</List>
															</Collapse>
														</>
													)}
												</>
											)
										})}
									</List>
								</Collapse>
							</>
						)
					})}
			</List>
		</Box>
	)
}
