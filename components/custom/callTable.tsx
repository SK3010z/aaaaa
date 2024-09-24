import { CallTableFilters } from './callTableFilters'

export function CallTable() {
  return (
    <div className="px-8 pb-6">
      <div className="bg-white border rounded">
        <CallTableFilters />
      </div>
    </div>
  )
}
