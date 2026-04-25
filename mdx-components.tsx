import type { MDXComponents } from 'mdx/types'
import { ChapterCard } from '@/components/ui/ChapterCard';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ChapterCard,
  }
}