import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z
      .enum(['primary', 'neutral', 'success', 'warning', 'error', 'info'])
      .optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    variant: z
      .enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
      .optional(),
    target: z.enum(['_blank', '_self']).optional()
  })

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        content: z.object({}),
        faq: z.object({
          title: z.string().nonempty(),
          list: z.array(z.object({
            question: z.string().nonempty(),
            key: z.string().nonempty(),
            answer: z.string().nonempty()
          }))
        })
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        url: z.string().nonempty(),
        label: z.string().nonempty(),
        tags: z.array(z.object({
          text: z.string().nonempty(),
          icon: z.string().nonempty()
        })),
        date: z.date()
      })
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        minRead: z.number(),
        date: z.date(),
        image: z.string().nonempty().editor({ input: 'media' })
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [{ include: 'projects.yml' }, { include: 'blog.yml' }],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    resume: defineCollection({
      type: 'page',
      source: 'resume.yml',
      schema: z.object({
        content: z.object({}),
        links: z.array(createButtonSchema()),
        timelineHeading: z.string(),
        events: z.array(
          z.object({
            category: z.enum([
              'Promotion',
              'Start Date',
              'Conference',
              'Education',
              'Certification',
              'Award',
              'Title Change'
            ]),
            description: z.string(),
            icon: z.string().optional(),
            title: z.string(),
            date: z.date(),
            location: z.string(),
            url: z.string().optional(),
            color: z
              .enum([
                'primary',
                'neutral',
                'success',
                'warning',
                'error',
                'info'
              ])
              .optional()
          })
        ),
        accomplishments: z.object({
          content: z.string(),
          list: z.array(z.object({
            icon: z.string().optional(),
            title: z.string().nonempty(),
            description: z.string().nonempty()
          }))
        }),
        skills: z.object({
          content: z.string(),
          blocks: z.array(
            z.object({
              key: z.string().optional(),
              content: z.string(),
              tags: z.array(
                z.object({
                  text: z.string(),
                  icon: z.string().optional()
                })
              )
            })
          )
        })
      })
    })
  }
})
