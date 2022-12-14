import { basename } from 'natmri/base/common/path'

const FILENAME_RE = /(^|[/\\])([^/\\]+?)(?=(\.[^.]+)?$)/

/**
 * give an filepath, returns the file name
 */
export function filename(path: string) {
  return path.match(FILENAME_RE)?.[2] || basename(path)
}
