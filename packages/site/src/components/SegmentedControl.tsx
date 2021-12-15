import { useId } from "@radix-ui/react-id"
import {
  Item,
  Root,
  ToggleGroupItemProps,
  ToggleGroupSingleProps
} from "@radix-ui/react-toggle-group"
import { HTMLMotionProps, LayoutGroup, motion } from "framer-motion"
import { ReactChild, memo } from "react"
import { springy } from "../transitions"
import { mergeProps } from "../utils/merge-props"

interface Props extends Omit<ToggleGroupSingleProps, "type"> {
  backgroundProps?: HTMLMotionProps<"span">
  itemProps?: Omit<ToggleGroupItemProps, "value">
  labels?: ReactChild[]
  options: string[]
  selectedItemProps?: Omit<ToggleGroupItemProps, "value">
}

export const SegmentedControl = memo(
  ({
    options,
    labels = [],
    value,
    onValueChange,
    itemProps = {},
    selectedItemProps = {},
    backgroundProps = {},
    ...props
  }: Props) => {
    const id = useId()
    const mergedItemProps = mergeProps(itemProps, selectedItemProps)

    return (
      <LayoutGroup id={id}>
        <Root
          onValueChange={onValueChange}
          value={value}
          {...props}
          type="single"
        >
          {options.map((option, index) => (
            <Item
              key={index}
              value={option}
              {...(option === value ? mergedItemProps : itemProps)}
            >
              <span className="relative z-10">{labels[index] ?? option}</span>
              {option === value && (
                <motion.span
                  aria-hidden
                  layoutId="background"
                  transition={springy}
                  {...backgroundProps}
                />
              )}
            </Item>
          ))}
        </Root>
      </LayoutGroup>
    )
  }
)
