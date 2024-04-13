/**
 * Allow easy multi-arm matching (rval switch) of values
 *
 * Use:
 * ```js
 * selector(
 *   0, <SearchSlash />,
 *   1, <Camera />,
 *   2, <Landmark />,
 *   3, <CircleDollarSign />,
 *   4, <ArrowLeftRight />,
 *   5, <CheckCircle />,
 *   6, <XCircle />,
 * )(window.status, <BadgeAlert />)
 * ```
 */
export default function selector(...args: any[]) {
  return (value: any, defaultValue?: any) => {
    for (let i = 0; i < args.length; i = i + 2) {
      if (args[i] === value) {
        return args[i + 1]
      }
    }
    return defaultValue
  }
}
