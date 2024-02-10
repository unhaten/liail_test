import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Collapse,
	Box
} from "@mui/material"
import IService from "../types/IService"
import InnerItem from "./InnerItem"
import { FC } from "react"

interface InnerListProps {
	data: IService[] | null
	item: IService
	selectedInnerIndex: number | null
	handleInnerClick(index: number): void
}

const InnerList: FC<InnerListProps> = ({
	data,
	item,
	selectedInnerIndex,
	handleInnerClick
}) => {
	return (
		<>
			<List component="div" disablePadding>
				{data &&
					data.map((item2: IService) => {
						return (
							<Box key={item2.id}>
								{item2.head === item.id && (
									<>
										<ListItem sx={{ ml: 2 }}>
											<ListItemButton
												onClick={() =>
													item2.node === 1 &&
													handleInnerClick(item2.id)
												}
											>
												<ListItemText
													sx={{
														"& span": {
															fontWeight:
																item2.node === 1
																	? 600
																	: 400
														}
													}}
													primary={
														`${item2.name}` +
														`${
															item2.node === 0
																? ` - ${item2.price}`
																: ""
														}`
													}
												/>
												{item2.node === 1 ? (
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
											in={item2.id === selectedInnerIndex}
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
												<InnerItem
													data={data}
													item2={item2}
													item={item}
												/>
											</List>
										</Collapse>
									</>
								)}
							</Box>
						)
					})}
			</List>
		</>
	)
}

export default InnerList
