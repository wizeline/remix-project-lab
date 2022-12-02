import Header from "app/core/layouts/Header"
import GoBack from "app/core/layouts/GoBack"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { ProjectForm } from "./components/ProjectForm"
import { withZod } from "@remix-validated-form/with-zod"
import { z } from "zod"
import { validationError, ValidatedForm } from "remix-validated-form"
import { json, redirect } from "@remix-run/node"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { zfd } from "zod-form-data"
import { requireProfile } from "~/session.server"
import { createProject } from "~/models/project.server"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime"
import { Box } from "@mui/material"

export const validator = withZod(
  zfd
    .formData({
      name: zfd.text(z.string().min(1)),
      description: zfd.text(z.string().min(1)),
      valueStatement: zfd.text(z.string().optional()),
      helpWanted: zfd.checkbox(),
      disciplines: zfd.repeatable(z.array(z.string()).optional()),
      target: zfd.text(z.string().optional()),
      repoUrls: zfd.repeatable(
        z
          .array(
            z.object({
              url: zfd.text(z.string().optional()),
              id: z.string().optional(),
            })
          )
          .optional()
      ),
      slackChannels: zfd.text(z.string().optional()),
      skills: z
        .array(
          z.object({
            id: z.string(),
            name: z.string().optional(),
          })
        )
        .optional(),
      labels: z
        .array(
          z.object({
            id: z.string(),
            name: z.string().optional(),
          })
        )
        .optional(),
      // relatedProjectsA: zfd.repeatable(z.array(z.string()).optional()),
      projectMembers: zfd.repeatable(
        z
          .array(
            z.object({
              profileId: zfd.text(),
              name: zfd.text(z.string().optional()),
              roles: zfd.repeatable(z.array(z.string()).optional()),
              skills: zfd.repeatable(z.array(z.string()).optional()),
              hours: zfd.text(z.string().optional()),
              active: zfd.checkbox(),
            })
          )
          .optional()
      ),
    })
    .transform((val) => {
      // val.relatedProjectsA = val.relatedProjectsA?.filter((el) => el != "");
      return val
    })
)

export const action: ActionFunction = async ({ request }) => {
  const profile = await requireProfile(request)
  const result = await validator.validate(await request.formData())

  if (result.error) return validationError(result.error)

  try {
    const project = await createProject(result.data, profile.id)
    return redirect(`/projects/${project.id}`)
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError && Array.isArray(e.meta?.target)) {
      if (e.meta?.target.includes("name")) {
        return validationError({
          fieldErrors: {
            name: "Project name already exists",
          },
        })
      } else {
        e.meta?.target?.map((target: string) => {
          return validationError({
            fieldErrors: {
              [target]: "Invalid value",
            },
          })
        })
      }
    }
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await requireProfile(request)
  return json({ profile })
}

const NewProjectPage = () => {
  const navigate = useNavigate()
  const { profile } = useLoaderData()

  return (
    <div>
      <Header title="Create your proposal" />
      <div className="wrapper">
        <h1 className="form__center-text">Create your proposal</h1>
      </div>
      <div className="wrapper">
        <GoBack title="Back to main page" onClick={() => navigate("/")} />
        <ValidatedForm
          validator={validator}
          defaultValues={{
            helpWanted: false,
            projectMembers: [
              {
                profileId: profile.id,
                name: profile.name,
                roles: [],
                skills: [],
                hours: "0",
                active: true,
              },
            ],
          }}
          method="post"
        >
          <ProjectForm projectformType="create" />
          <Box textAlign="center">
            <button type="submit" className="primary">
              {"Create Project"}
            </button>
          </Box>
        </ValidatedForm>
      </div>
    </div>
  )
}

export default NewProjectPage