export interface ActiveEntity {
  key: string;
  label: string;
  type: string;
  mode?: "ready" | "write" | "generated";
  optional?: boolean;
  valueRenderer?: string;
  fields?: ActiveMap<ActiveEntity>;
}

export class ActiveMap<K> {
  private map: { [key: string]: K } = {};

  public add(key: string, value: K): ActiveMap<K> {
    if (key !== null) {
      this.map[key] = value;
    }
    return this;
  }

  public has(key: string | undefined | null): boolean {
    if (key) {
      if (this.map[key]) {
        return true;
      }
    }
    return false;
  }

  public get(key: string): K | undefined {
    if (key !== null) {
      if (this.map[key] !== undefined) {
        return this.map[key];
      }
    }
    return undefined;
  }

  public getInternalMap(): { [key: string]: K } {
    return this.map;
  }
}

export const entityListToMap = (entities: ActiveEntity[]): ActiveMap<any> => {
  const map: ActiveMap<any> = new ActiveMap();
  entities.map((item) => {
    map.add(item.key, item);
  });
  return map;
};

export const entityMapToFormList = (map: { [key: string]: any }):ActiveEntity[] => {
  // console.log("-----------------------", map);
  const list:ActiveEntity[] = [];
  for (const [key, value] of Object.entries(map)) {
    // console.log(`(F) ${key}  `);
    const feildMap = value as ActiveEntity;
    // console.log(feildMap);
    if (
      feildMap &&
      feildMap.mode &&
      (feildMap.mode === "write" || feildMap.mode === "generated")
    ) {
      // console.log(feildMap);
      list.push(feildMap);
    }    
  }
  // console.log(list)
  return list;
};
