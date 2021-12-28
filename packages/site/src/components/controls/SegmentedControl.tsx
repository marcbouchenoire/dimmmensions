import { useId } from "@radix-ui/react-id"
import {
  Item,
  Root,
  ToggleGroupItemProps,
  ToggleGroupSingleProps
} from "@radix-ui/react-toggle-group"
import { HTMLMotionProps, LayoutGroup, motion } from "framer-motion"
import { ReactChild, memo } from "react"
import { springy } from "../../transitions"
import { mergeProps } from "../../utils/merge-props"

interface Props extends Omit<ToggleGroupSingleProps, "type"> {
  /**
   * A set of `motion.span` props for the background element.
   */
  backgroundProps?: HTMLMotionProps<"span">

  /**
   * A list of option labels.
   */
  labels?: ReactChild[]

  /**
   * A list of option values.
   */
  options: string[]

  /**
   * A set of props for the segment elements.
   */
  segmentProps?: Omit<ToggleGroupItemProps, "value">

  /**
   * A set of props for the currently selected segment element.
   */
  selectedSegmentProps?: Omit<ToggleGroupItemProps, "value">
}

/**
 * A set of two or more mutually exclusive segments.
 *
 * @param props - A set of props.
 * @param props.options - A list of option values.
 * @param [props.labels] - A list of option labels.
 * @param [props.value] - The default value.
 * @param [props.onValueChange] - A function invoked whenever the value changes.
 * @param [props.segmentProps] - A set of props for the segment elements.
 * @param [props.selectedSegmentProps] - A set of props for the currently selected segment element.
 * @param [props.backgroundProps] - A set of `motion.span` props for the background element.
 */
export const SegmentedControl = memo(
  ({
    options,
    labels = [],
    value,
    onValueChange,
    segmentProps = {},
    selectedSegmentProps = {},
    backgroundProps = {},
    ...props
  }: Props) => {
    const id = useId()
    const mergedSegmentProps = mergeProps(segmentProps, selectedSegmentProps)

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
              {...(option === value ? mergedSegmentProps : segmentProps)}
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
