import { ExpandLess, ExpandMore } from "@mui/icons-material"
import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Collapse
} from "@mui/material"
import IService from "../types/IService"
import InnerItem from "./InnreItem"

const InnerList = ({ data, item, selectedInnerIndex, handleInnerClick }) => {
	return (
		<>
			<List component="div" disablePadding>
				{data.map((item2: IService) => {
					return (
						<>
							{item2.head === item.id && (
								<>
									<ListItem key={item2.id} sx={{ ml: 2 }}>
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
						</>
					)
				})}
			</List>
		</>
	)
}

export default InnerList
