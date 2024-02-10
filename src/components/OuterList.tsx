import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	Collapse
} from "@mui/material"
import IService from "../types/IService"
import InnerList from "./InnerList"
import { FC } from "react"

interface OuterListProps {
	data: IService[] | null
	handleClick(index: number): void
	selectedIndex: number | null
	selectedInnerIndex: number | null
	handleInnerClick(index: number): void
}

const OuterList: FC<OuterListProps> = ({
	data,
	handleClick,
	selectedIndex,
	selectedInnerIndex,
	handleInnerClick
}) => {
	return (
		<>
			{data &&
				data.map((item: IService) => {
					return (
						<Box key={item.id}>
							{item.head === null && (
								<ListItem>
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
						</Box>
					)
				})}
		</>
	)
}

export default OuterList
