---
title: stl模型减面
date: 2023-11-10
tags:
  - python
---





```python
import bpy
import addon_utils
import sys
import logging

# 创建一个日志器logger并设置其日志级别为DEBUG
log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)

# 创建一个流处理器handler并设置其日志级别为DEBUG
handler = logging.StreamHandler(sys.stdout)
handler.setLevel(logging.DEBUG)

# 创建一个格式器formatter并将其添加到处理器handler
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)

# 为日志器logger添加上面创建的处理器handler
log.addHandler(handler)


# 判断x是否在 a~b 之间
def is_between(a, x, b):
    return min(a, b) < x < max(a, b)


# 第一个参数:输入的stl文件路径
# 第一个参数:输出的stl文件路径
# 第一个参数:stl转换完要修改的比率(可选)：默认0.3
# brain.py后面的 -- 含义：不让blender解析参数
# 示例:  blender emptysence.blend --background --python brain.py -- /app/data/brain_g1.stl /app/data/brain.stl
if __name__ == "__main__":
    # 系统参数
    argv = sys.argv
    # 输入brain.stl文件路径
    inputPath = ""
    # 输出brain.stl文件路径
    outputPath = ""
    try:
        inputPath = argv[6]
        outputPath = argv[7]
    except IndexError:
        log.error("missing require parameters: inputPath: %s, outputPath: %s" % (inputPath, outputPath))
        sys.exit(2)
    log.info("input path: %s" % inputPath)
    log.info("output path: %s" % outputPath)

    # stl转换完要修改的比率
    ratio = 0.0
    try:
        ratio = argv[8]
        ratio = float(ratio)
    except IndexError:
        pass
    except ValueError:
        log.warning("ratio param type not match: %s" % ratio)
        ratio = 0.3
        pass
    if not is_between(0.0, float(ratio), 1.0):
        ratio = 0.3
    log.info("ratio: %s" % ratio)

    # 导入stl
    bpy.ops.import_mesh.stl(filepath=inputPath)
    # 启用print3d插件
    addon_utils.enable(module_name="object_print3d_utils")

    # degenerate
    bpy.context.scene.print_3d.threshold_zero = 0.1
    # thickness
    bpy.context.scene.print_3d.thickness_min = 0.1
    bpy.ops.object.editmode_toggle()
    bpy.ops.mesh.reveal()
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.delete_loose(use_verts=True, use_edges=True, use_faces=True)
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_interior_faces()
    bpy.ops.mesh.delete(type='FACE')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.dissolve_degenerate(threshold=0.0001)
    bpy.ops.mesh.select_non_manifold(extend=False, use_wire=True, use_boundary=True, use_multi_face=False,
                                     use_non_contiguous=False, use_verts=True)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.fill_holes(sides=0)
    bpy.ops.mesh.select_non_manifold(extend=False, use_wire=True, use_boundary=False, use_multi_face=False,
                                     use_non_contiguous=False, use_verts=True)
    bpy.ops.mesh.delete(type='VERT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.fill_holes(sides=0)
    bpy.ops.mesh.select_non_manifold(extend=False, use_wire=True, use_boundary=False, use_multi_face=False,
                                     use_non_contiguous=False, use_verts=True)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.fill_holes(sides=0)
    bpy.ops.mesh.select_non_manifold(extend=False, use_wire=True, use_boundary=False, use_multi_face=False,
                                     use_non_contiguous=False, use_verts=True)
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.normals_make_consistent()
    bpy.ops.object.editmode_toggle()
    bpy.ops.mesh.print3d_clean_non_manifold()

    # 修改比率
    bpy.ops.object.modifier_add(type='DECIMATE')
    bpy.context.object.modifiers["Decimate"].ratio = ratio
    bpy.ops.object.modifier_apply(modifier="Decimate")

    # 导出stl
    bpy.ops.export_mesh.stl(filepath=outputPath, use_selection=False)
    log.info("stl process success")
```

